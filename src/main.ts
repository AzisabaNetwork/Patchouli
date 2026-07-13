import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

async function main() {
  console.log("Starting...");

  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new Error("`BOT_TOKEN` must be set");
  }

  client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}`);
  });
  client.once(Events.Error, async (error) => {
    console.error("Discord client error:", error);
  });

  await client.login(token);
}

async function shutdown(signal) {
  console.log(`\nReceived ${signal}, shutting down...`);
  try {
    await client.destroy();
    console.log("Client destroyed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

main().catch((error) => {
  console.error("Error during startup:", error);
  process.exit(1);
});
