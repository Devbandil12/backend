

import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import dotenv from 'dotenv';
// import { sql } from 'drizzle-orm';
dotenv.config()


export const userTable=pgTable("users",{
    id:uuid("id").defaultRandom().primaryKey(),
    username:text("username").notNull(),
    name:text("name").notNull(),
    password:text("pass").notNull()
})


export const actionsTable=pgTable("actions",{
    id:uuid("id").defaultRandom().primaryKey(),
    name:text("action_name").notNull(),  
})
export const triggerTable=pgTable("trigger",{
    id:uuid("id").defaultRandom().primaryKey(),
    name:text("trigger_name").notNull(),  
})

export const zaptable=pgTable("zap",{
    
    id:uuid("id").defaultRandom().primaryKey(),
    userid:uuid("user_id").references(()=>userTable.id),
    triggerId:uuid("triggerId").references(()=>triggerTable.id),
    actionId: uuid("actionsId").references(()=>actionsTable.id),
    actionOrder:integer("actionOrder").notNull()
})

export const outBoxTable=pgTable("outbox",{
    
    id:uuid("id").defaultRandom().primaryKey(),
    userid:uuid("user_id").references(()=>userTable.id),
    triggerId:uuid("triggerId").references(()=>triggerTable.id),
    actionId: uuid("actionsId").references(()=>actionsTable.id),
    actionOrder:integer("actionOrder").notNull()
})

