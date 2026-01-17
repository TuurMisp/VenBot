const { REST, Routes } = require("discord.js");
require("dotenv").config();

const venerationCommand = require("./commands/veneration");

const commands = [
    venerationCommand.data.toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Registering global slash commands...");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log("✅ Global slash commands registered.");
    } catch (error) {
        console.error(error);
    }
})();
