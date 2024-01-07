import * as SQLite from 'expo-sqlite';
import { GroceryItemType } from '../types/grocery-item-type';
import { CollectionGroceryType } from '../types/collection-grocery-type';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { logger } from '../utils/logger';

const databaseFileName = "grocery-buddy.db";
const collectionTableName = "CollectionGrocery";
const groceryTableName = "GroceryItem";
const db = SQLite.openDatabase(databaseFileName);


export const initCreateTable = async (): Promise<void> => {
    try {
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
        logger.error(error);
    }
};


export const seedDBGrocery = async (): Promise<void> => {
    try {
        // seed collection
        await db.transactionAsync(async tx => {
            for(let i=0; i<5; i++){
                await tx.executeSqlAsync(`
                    INSERT OR IGNORE INTO ${collectionTableName} (collectionId, name, date, isOnNotification)
                    VALUES ('defaultCollection-${i}', '${faker.word.words(2)}', '${dayjs(faker.date.anytime()).format("YYYY-MM-DD")}', 0);
                `);
            }
        });

        //seed grocery
        await db.transactionAsync(async tx => {
            for(let i=0; i<5; i++){
                for(let j=0; j<3; j++){
                    await tx.executeSqlAsync(`
                        INSERT OR IGNORE INTO ${groceryTableName} (id, name, detail, groceryImageUri, quantity, pricePerItem, totalPricePerItem, isCheck, collectionId)
                        VALUES ('defaultGroceryItemId-${j}', '${faker.word.words(2)}', '${faker.word.words(10)}', '${faker.image.urlLoremFlickr({ category: 'food' })}', 0, 0.0, 0.0, 0, 'defaultCollection-${i}');
                    `);
                }
            }
        });
        
    } catch (error) {
        logger.error(error);
    }
}


export const getAllCollection = async (): Promise<Omit<CollectionGroceryType, "listGrocery">[]> => {
    try {
        // PRAGMA table_info(CollectionGrocery)
        // SELECT name FROM sqlite_master WHERE type="table"
        const query = `
            SELECT * from ${collectionTableName}
        `;
        let resultsDB = [];
        await db.transactionAsync(async tx => {
            const results = await tx.executeSqlAsync(query, []);
            // console.log("Data grocery: ", results.rows);
            resultsDB = results.rows;
        });

        return resultsDB;

    } catch (error) {
        logger.error(error);
        return [];
    }
}

export const getAllGroceryItem = async (): Promise<GroceryItemType[]> => {
    try {
        const query = `
            SELECT * from ${groceryTableName}
        `;
        let resultsDB = [];
        await db.transactionAsync(async tx => {
            const results = await tx.executeSqlAsync(query, []);
            // console.log("Data collection: ", results.rows);
            resultsDB = results.rows;
        });

        return resultsDB;

    } catch (error) {
        logger.error(error);
        return [];
    }
}


export const getAllCollectionWithGrocery = async (): Promise<CollectionGroceryType[]> => {
    try {
        const query = `
            SELECT
                CollectionGrocery.collectionId,
                CollectionGrocery.name,
                CollectionGrocery.date,
                CollectionGrocery.isOnNotification,
                '[' ||
                    GROUP_CONCAT(
                    '{' ||
                        '"id":"' || GroceryItem.id || '",' ||
                        '"name":"' || GroceryItem.name || '",' ||
                        '"detail":"' || GroceryItem.detail || '",' ||
                        '"groceryImageUri":"' || GroceryItem.groceryImageUri || '",' ||
                        '"quantity":' || GroceryItem.quantity || ',' ||
                        '"pricePerItem":' || GroceryItem.pricePerItem || ',' ||
                        '"totalPricePerItem":' || GroceryItem.totalPricePerItem || ',' ||
                        '"isCheck":' || GroceryItem.isCheck || ',' ||
                        '"collectionId":"' || GroceryItem.collectionId || '"' ||
                    '}'
                    , ',') ||
                ']' AS listGrocery
            FROM
                CollectionGrocery
            LEFT JOIN
                GroceryItem ON CollectionGrocery.collectionId = GroceryItem.collectionId
            GROUP BY
                CollectionGrocery.collectionId
            ORDER BY 
                CollectionGrocery.date DESC;
        `;
        let resultsDB = [];
        await db.transactionAsync(async tx => {
            const results = await tx.executeSqlAsync(query, []);
            resultsDB = results.rows;
        });

        return resultsDB.map((item: CollectionGroceryType) => {
            const listGrocery = typeof item.listGrocery === 'string' ? JSON.parse(item.listGrocery) : item.listGrocery;

            return {
                ...item,
                listGrocery: listGrocery ?? [],
            }
        });

    } catch (error) {
        logger.error(error);
        return [];
    }
}


export const dbAddCollection = async ({
    collectionId,
    name,
    date,
}: Pick<CollectionGroceryType, "collectionId" | "name" | "date">) => {
    try {
        const query = `
            INSERT INTO ${collectionTableName} (collectionId, name, date, isOnNotification)
            VALUES (?,?,?,?);
        `;
        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(query, [
                collectionId,
                name,
                dayjs(date).format("YYYY-MM-DD"),
                0       
            ]);
        });

    } catch (error) {
        logger.error(error);        
    }
}

// TODO: update collection item
export const dbDeleteCollection = async (collectionId: string) => {
    try {
        const query = `
            DELETE FROM ${collectionTableName}
            WHERE collectionId='${collectionId}'
        `;
        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(query, []);
        });

    } catch (error) {
        console.error(error);
    }
}


export const dbAddGroceryItem = async ({
    collectionId,
    id,
    name,
    detail,
    groceryImageUri,
    quantity,
    pricePerItem,
    totalPricePerItem,
    isCheck,
} : GroceryItemType): Promise<void> => {
    try {
        // VALUES ('defaultGroceryItemId-${1}', '${faker.word.words(2)}', '${faker.word.words(10)}', '${faker.image.urlLoremFlickr({ category: 'food' })}', 0, 0.0, 0.0, 0, '${collectionId}');
        const query = `
            INSERT INTO ${groceryTableName} (id, name, detail, groceryImageUri, quantity, pricePerItem, totalPricePerItem, isCheck, collectionId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        await db.transactionAsync(async tx => {
            const results = await tx.executeSqlAsync(query, [
                id,
                name, 
                detail, 
                groceryImageUri, 
                quantity, 
                pricePerItem,
                totalPricePerItem,
                isCheck ? 1 : 0,
                collectionId,
            ]);
        });

    } catch (error) {
        console.error(error);
    }
}


export const dbUpdateTickGroceryItem = async ({
    id,
    isCheck,
}: Pick<GroceryItemType, "id" | "isCheck">) => {
    try {
        const modifyIsCheck = isCheck ? 0 : 1;
        const query = `
            UPDATE ${groceryTableName}
            SET isCheck=${modifyIsCheck}
            WHERE id='${id}';
        `;

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(query);
        });

    } catch (error) {
        console.error(error);
    }
}


export const dbUpdateQuantityAndTotalPrice = async ({
    id,
    quantity,
    pricePerItem,
    isAddingQuantity,
}: Pick<GroceryItemType, "id" | "quantity" | "pricePerItem"> & {
    isAddingQuantity: boolean
}) => {
    try {
        const builderQueryUpdateQuantityAndTotalPricePerItemGroceryItem = (modifiedQuantity: number, totalPricePerItem: number) => {
            return `
                UPDATE ${groceryTableName}
                SET quantity=${modifiedQuantity}, totalPricePerItem=${totalPricePerItem}
                WHERE id='${id}';
            `;
        }
        

        await db.transactionAsync(async tx => {
            let modifiedQuantity: number;

            if(isAddingQuantity){
                modifiedQuantity = quantity + 1;
                const totalPricePerItem = pricePerItem * modifiedQuantity;
                const query = builderQueryUpdateQuantityAndTotalPricePerItemGroceryItem(modifiedQuantity, totalPricePerItem);
                await tx.executeSqlAsync(query);
            }
            if(!isAddingQuantity){
                if(quantity === 0){
                    modifiedQuantity = 0;
                }else{
                    modifiedQuantity = quantity - 1;
                }
                const totalPricePerItem = pricePerItem * modifiedQuantity;
                const query = builderQueryUpdateQuantityAndTotalPricePerItemGroceryItem(modifiedQuantity, totalPricePerItem);
                await tx.executeSqlAsync(query);
            }
        });

    } catch (error) {
        console.error(error);
    }
}


export const dbUpdateGroceryItemInfo = async ({
    id,
    name,
    detail,
    quantity,
    pricePerItem,
}: Pick<GroceryItemType, "id" | "name" | "detail" | "quantity" | "pricePerItem"> ) => {
    try {
        const totalPricePerItem = pricePerItem * quantity;
        const query = `
            UPDATE ${groceryTableName}
            SET name='${name}', detail='${detail}', quantity=${quantity}, pricePerItem=${pricePerItem}, totalPricePerItem=${totalPricePerItem}
            WHERE id='${id}';
        `;

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(query, []);
        });

    } catch (error) {
        console.error(error);
    }
}


export const dbDeleteGroceryItem = async (groceryId: string) => {
    try {
        const query = `
            DELETE FROM ${groceryTableName}
            WHERE id='${groceryId}';
        `;
        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(query, []);
        });
    } catch (error) {
        logger.error(error);
    }
}
