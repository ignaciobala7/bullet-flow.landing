import sqlite3
import os

DB_NAME = 'crm_bulletflow.db'

def create_database():
    """Crea la base de datos local y la tabla de leads."""
    # Conectarse a SQLite (esto creará el archivo si no existe)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    print("Inicializando la base de datos CRM de BulletFlow...")

    # Crear tabla de leads
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            store_url TEXT,
            problem TEXT,
            status TEXT DEFAULT 'nuevo',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    print(f"Tabla 'leads' creada o ya existente en {DB_NAME}.")

    # Mostrar la estructura para verificar
    cursor.execute("PRAGMA table_info(leads)")
    columns = cursor.fetchall()
    print("\nEstructura de la tabla:")
    for col in columns:
        print(f" - {col[1]} ({col[2]})")

    conn.close()
    print("\n¡CRM local listo para recibir datos de n8n!")

if __name__ == "__main__":
    # Asegurarnos de estar en el directorio correcto
    # (por defecto se creará donde se ejecute el script)
    create_database()
