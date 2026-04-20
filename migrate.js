/**
 * Script de migración de datos del MongoDB local al MongoDB de Docker
 * 
 * PASO 1 - Exportar (Docker APAGADO):
 *   node migrate.js export
 * 
 * PASO 2 - Importar (Docker ENCENDIDO):
 *   node migrate.js import
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'ecommerce';
const BACKUP_FILE = path.join(__dirname, 'backup_ecommerce.json');

const COLLECTIONS = ['vehiculos', 'users', 'ventas', 'pagos', 'carritos'];

async function exportData() {
  console.log('🔄 Conectando al MongoDB LOCAL para exportar...');
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const backup = {};

    for (const col of COLLECTIONS) {
      try {
        const docs = await db.collection(col).find({}).toArray();
        backup[col] = docs;
        console.log(`  ✅ ${col}: ${docs.length} documentos exportados`);
      } catch (err) {
        console.log(`  ⚠️  ${col}: colección no encontrada, saltando...`);
        backup[col] = [];
      }
    }

    fs.writeFileSync(BACKUP_FILE, JSON.stringify(backup, null, 2));
    console.log(`\n✅ Backup guardado en: ${BACKUP_FILE}`);
    console.log('\n👉 Ahora ENCIENDE el Docker y ejecuta: node migrate.js import');
  } catch (err) {
    console.error('❌ Error al conectar:', err.message);
    console.log('  Asegúrate de que el Docker está APAGADO y el MongoDB local está corriendo.');
  } finally {
    await client.close();
  }
}

async function importData() {
  if (!fs.existsSync(BACKUP_FILE)) {
    console.error('❌ No se encuentra el archivo de backup. Ejecuta primero: node migrate.js export');
    return;
  }

  console.log('🔄 Conectando al MongoDB de DOCKER para importar...');
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const backup = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf-8'));

    for (const [col, docs] of Object.entries(backup)) {
      if (docs.length === 0) continue;
      try {
        // Borrar los datos existentes en esa colección del Docker
        await db.collection(col).deleteMany({});
        // Insertar los docs del backup
        const result = await db.collection(col).insertMany(docs);
        console.log(`  ✅ ${col}: ${result.insertedCount} documentos importados`);
      } catch (err) {
        console.log(`  ⚠️  ${col}: error importando - ${err.message}`);
      }
    }

    console.log('\n🎉 ¡Migración completada! Ahora el Docker tiene todos tus datos.');
    console.log('👉 Arranca el backend con npm run dev y comprueba la web.');
  } catch (err) {
    console.error('❌ Error al conectar:', err.message);
    console.log('  Asegúrate de que el Docker está ENCENDIDO.');
  } finally {
    await client.close();
  }
}

const action = process.argv[2];
if (action === 'export') {
  exportData();
} else if (action === 'import') {
  importData();
} else {
  console.log('Uso:');
  console.log('  node migrate.js export   → Exporta datos del MongoDB local (Docker APAGADO)');
  console.log('  node migrate.js import   → Importa datos al Docker (Docker ENCENDIDO)');
}
