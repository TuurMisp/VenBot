const { SlashCommandBuilder } = require("discord.js");

function totalMonthsBetween(fromDate, toDate) {
    let months =
        (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
        (toDate.getMonth() - fromDate.getMonth());

    if (toDate.getDate() < fromDate.getDate()) {
        months--;
    }

    return months;
}

function checkVenerations(startDate, venerationNumber) {
    const currentDate = new Date();

    if (venerationNumber < 1 || venerationNumber > 12) {
        return "❌ Veneration must be between 1 and 12.";
    }

    const monthsElapsed = totalMonthsBetween(startDate, currentDate);
    const requiredMonths = venerationNumber * 3;

    let result = `**Veneration ${venerationNumber}**\n`;
    result += `Required: ${requiredMonths} months\n`;
    result += `Elapsed: ${monthsElapsed} months\n\n`;

    if (monthsElapsed >= requiredMonths) {
        result += "✅ **Eligible for this veneration**\n";
    } else {
        result += "❌ **Not eligible yet**\n";
    }

    const indefectibleDate = new Date("2021-05-01");
    if (startDate < indefectibleDate) {
        result += "\n🏅 **Eligible for the l'indéfectible medal**";
    }

    return result;
}

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
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(12)
        ),

    async execute(interaction) {
        const joinDateInput = interaction.options.getString("joindate");
        const venerationNumber = interaction.options.getInteger("number");

        const startDate = new Date(joinDateInput);
        if (isNaN(startDate.getTime())) {
            return interaction.reply({
                content: "❌ Invalid date format. Use YYYY-MM-DD.",
                ephemeral: true
            });
        }

        const result = checkVenerations(startDate, venerationNumber);

        await interaction.reply(result);
    }
};
