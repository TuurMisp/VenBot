const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [
    // command data
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Registering global slash commands...");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log("Global slash commands registered.");
    } catch (error) {
        console.error(error);
    }
})();
