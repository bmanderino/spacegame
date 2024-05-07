'use server'

import Image from "next/image";
import styles from "./page.module.css";
import { createClient } from '@/utils/supabase/server';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { redirect } from 'next/navigation'

const supabase = createClient();
const userID = 3;

type WorldState = {
  player: PlayerState;
  reachableStories: Record<StoryID, true>;
  reachableDestinations: Record<DestinationID, true>;
  currentDestination: DestinationID;
};

const database = {
  inventory: [
    {"ID": 1, "name":"phaser", "type":"weapon", "stat":{"dex": 2, "int": 1}},
    {"ID": 2, "name":"communicator", "type":"trinket"},
    {"ID": 3, "name":"tricorder", "type":"trinket" },
    {"ID": 4, "name":"wooden spear", "type":"weapon", "stat":{"str": 1} }
  ] as InventoryItem[]
}

async function loadWorld(): Promise<WorldState> {
  const { data: world } = await supabase
    .from("world")
    .select()
    .eq('id', userID);

  return (world?.[0] as any)?.worldState
}

async function addItemToInventory(itemId: number, world: WorldState) {
  let inventoryItem = database.inventory.find((inv) => inv.ID = itemId)
  if (inventoryItem){
    world.player.inventory.items.push({...inventoryItem, "equipped": false, "count": 1})

    const {data, error} = await supabase
      .from('world')
      .update({ worldState: world })
      .eq('id', userID)
      .select()
  }
}

async function saveWorld(world: WorldState) {
  world.player.name += '!'

  const {data, error} = await supabase
    .from('world')
    .update({ worldState: world })
    .eq('id', userID)
    .select()
}

export default async function Home() {

  const world = await loadWorld();

  console.log("!!!!!", world)
  async function doSomething() {
    'use server'
    await saveWorld(world)
    redirect('/')
  }
  // saveWorld(world)

  async function takeItem() {
    'use server'
    await addItemToInventory(4, world)
    redirect('/')
  }

  return (
    <main>
      <div>
        <p>Name: {world.player.name}</p>
        <p>Role: {world.player.role}</p>
        <p>ShipName: {world.player.shipName}</p>
        <p>Stats:</p>
        <div>{Object.keys(world.player.stats).map((key) => <p key={key}>{key}: {world.player.stats[key as keyof CharacterStats]}</p>)}</div>
        <div>Inventory:</div>
        <div>{world.player.inventory.items.map((item) => <p key={item.ID}>{item.name}</p>)}</div>

        <form action={doSomething}>
          <input type='submit'/>
        </form>
        <form action={takeItem}>
          <input type='submit' value="add item"/>
        </form>
      </div>
    </main>
  );
}
