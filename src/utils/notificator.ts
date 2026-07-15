import { PatchNote } from "@azisaba/graph";
import { Client } from "discord.js";

import { Config } from "../config";

export async function notifyPublished(client: Client, config: Config, patchNote: PatchNote) {
  const channelId = config.patchNoteTargets[patchNote.target]?.notificationChannelId;
  if (!channelId) {
    return;
  }

  const channel = await client.channels.fetch(channelId);
  if (!channel) {
    throw new Error(`Discord notification channel ${channelId} not found`);
  }
  if (!channel.isSendable()) {
    throw new Error(`Discord notification channel ${channelId} is not sendable`);
  }

  await channel.send({
    content: `${patchNote.title}`,
  });
}
