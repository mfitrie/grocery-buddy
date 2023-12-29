import * as SQLite from 'expo-sqlite';
import { GroceryItemType } from '../types/grocery-item-type';
import { CollectionGroceryType } from '../types/collection-grocery-type';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

const databaseFileName = "grocery-buddy.db";
const collectionTableName = "CollectionGrocery";
const groceryTableName = "GroceryItem";

// export const getDBConnection = async () => {
//     return openDatabase({
//         name: 'grocery-buddy-data.db', 
//         location: 'default'
//     });
// };

export const initCreateTable = async (): Promise<void> => {
    try {
        const db = SQLite.openDatabase(databaseFileName);
        
        const queryPragmaOn = `PRAGMA foreign_keys = ON;`;
        const queryCreateCollectionTable = `
            CREATE TABLE IF NOT EXISTS ${collectionTableName} (
                collectionId TEXT PRIMARY KEY,
                name TEXT,
                date DATE,
                isOnNotification BOOLEAN
            );
        `;
        const queryCreateGroceryItemTable = `
            CREATE TABLE IF NOT EXISTS ${groceryTableName} (
                id TEXT PRIMARY KEY,
                name TEXT,
                detail TEXT,
                groceryImageUri TEXT,
                quantity INTEGER,
                pricePerItem REAL,
                totalPricePerItem REAL,
                isCheck BOOLEAN,
                collectionId TEXT,
                FOREIGN KEY (collectionId) REFERENCES ${collectionTableName}(collectionId) ON UPDATE CASCADE ON DELETE CASCADE
            );
        `;
        // const queryDeleteGroceriesItem = `
        //     DELETE FROM ${groceryTableName};
        // `;
        // const queryDeleteCollectionItem = `
        //     DELETE FROM ${collectionTableName};    
        // `;
    
        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(queryPragmaOn, []);
            await tx.executeSqlAsync(queryCreateCollectionTable, []);
            await tx.executeSqlAsync(queryCreateGroceryItemTable, []);
            // await tx.executeSqlAsync(queryDeleteGroceriesItem, []);
            // await tx.executeSqlAsync(queryDeleteCollectionItem, []);
        });
        
    } catch (error) {
        console.error(error);
    }
};


export const seedDBGrocery = async (): Promise<void> => {
    try {
        const db = SQLite.openDatabase(databaseFileName);
        // seed collection
        await db.transactionAsync(async tx => {
            for(let i=0; i<5; i++){
                await tx.executeSqlAsync(`
                    INSERT OR IGNORE INTO ${collectionTableName} (collectionId, name, date, isOnNotification)
                    VALUES ('defaultCollection-${i}', '${faker.word.words(2)}', '${dayjs(faker.date.anytime())}', 0);
                `);
            }
        });

        //seed grocery
        await db.transactionAsync(async tx => {
            for(let i=0; i<5; i++){
                await tx.executeSqlAsync(`
                    INSERT OR IGNORE INTO ${groceryTableName} (id, name, detail, groceryImageUri, quantity, pricePerItem, totalPricePerItem, isCheck, collectionId)
                    VALUES ('defaultGroceryItemId-${i}', '${faker.word.words(2)}', '${faker.word.words(10)}', '${faker.image.urlLoremFlickr({ category: 'food' })}', 0, 0.0, 0.0, 0, 'defaultCollection-${i}');
                `);
            }
        });
        
    } catch (error) {
        console.error(error);
    }
}


export const getAllCollection = async (): Promise<CollectionGroceryType[]> => {
    try {
        const db = SQLite.openDatabase(databaseFileName);
        // PRAGMA table_info(CollectionGrocery)
        // SELECT name FROM sqlite_master WHERE type="table"
        const query = `
            SELECT * from ${collectionTableName}
        `;
        const resultsDB = [];
        await db.transactionAsync(async tx => {
            const results = await tx.executeSqlAsync(query, []);
            // console.log("Data grocery: ", results.rows);
            results.rows.forEach(item => {
                resultsDB.push(item);
            });
        });

        return resultsDB;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getAllGroceryItem = async (): Promise<GroceryItemType[]> => {
    try {
        const db = SQLite.openDatabase(databaseFileName);
        const query = `
            SELECT * from ${groceryTableName}
        `;
        const resultsDB = [];
        await db.transactionAsync(async tx => {
            const results = await tx.executeSqlAsync(query, []);
            // console.log("Data collection: ", results.rows);
            results.rows.forEach(item => {
                resultsDB.push(item);
            });
        });

        return resultsDB;

    } catch (error) {
        console.error(error);
        return [];
    }
}


// TODO: make get all collection and grocery item with join


// TODO: make add db collection
// TODO: update collection item
// TODO: delete collection item


// TODO: make add db grocery
// TODO: delete grocery item
// TODO: delete grocery item