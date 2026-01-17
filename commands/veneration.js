const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("veneration")
        .setDescription("Check veneration eligibility")
        .addStringOption(option =>
            option
                .setName("joindate")
                .setDescription("Join date (YYYY-MM-DD)")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("number")
                .setDescription("Veneration number (1–12)")
                .setMinValue(1)
                .setMaxValue(12)
                .setRequired(true)
        ),

    async execute(interaction) {
        const joinDateInput = interaction.options.getString("joindate");
        const venerationNumber = interaction.options.getInteger("number");

        const startDate = new Date(joinDateInput);
        const currentDate = new Date();

        if (isNaN(startDate.getTime())) {
            return interaction.reply({
                content: "❌ Invalid date format. Use YYYY-MM-DD.",
                ephemeral: true
            });
        }

        function totalMonthsBetween(fromDate, toDate) {
            let months =
                (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
                (toDate.getMonth() - fromDate.getMonth());

            if (toDate.getDate() < fromDate.getDate()) {
                months--;
            }

            return months;
        }

        const monthsElapsed = totalMonthsBetween(startDate, currentDate);
        const requiredMonths = venerationNumber * 3;

        let reply =
            `📅 **Months elapsed:** ${monthsElapsed}\n` +
            `🏅 **Veneration ${venerationNumber}:** ${requiredMonths} months required\n\n`;

        if (monthsElapsed >= requiredMonths) {
            reply += "✅ **Eligible for this veneration**\n";
        } else {
            reply += `❌ **Not eligible yet** (${monthsElapsed}/${requiredMonths})\n`;
        }

        const indefectibleDate = new Date("2021-05-01");
        if (startDate < indefectibleDate) {
            reply += "\n🏵️ **Eligible for the l'indéfectible medal**";
        }

        await interaction.reply(reply);
    }
};
