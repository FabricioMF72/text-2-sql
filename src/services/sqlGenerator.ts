import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();
const endpoint = "https://models.inference.ai.azure.com";
const token = process.env["GITHUB_TOKEN"];
const modelName = "gpt-4o";
const client = new OpenAI({ baseURL: endpoint, apiKey: token });

export const generateSQL = async (query: string, schema?: Record<string, string[]>) => {
    const schemaText = schema
        ? `Schema: ${JSON.stringify(schema, null, 2)}`
        : "No schema provided.";

    const prompt = `Convert the following natural language query into an SQL statement. ${schemaText}\nQuery: "${query}"`;

    try {
        const response = await client.chat.completions.create({
            model: modelName,
            messages: [
                {
                    role: "system",
                    content: `You are an assistant that converts natural language queries into SQL statements. 
                              The output should be a valid SQL query without any explanations or formatting. 
                              Ensure the query is syntactically correct and adheres to standard SQL conventions.
                              do not /n in the response`,
                },
                {
                    role: "user", content: 'Give me the names of customers who made purchases this month.'
                },
                {
                    role: "assistant",
                    content: "SELECT users.name FROM users JOIN orders ON users.id = orders.user_id WHERE orders.created_at >= DATE_TRUNC('month', CURRENT_DATE);"
                },
                {
                    role: "user", content: 'Get all the products where the price is greater than 100.'
                },
                {
                    role: "assistant",
                    content: "SELECT * FROM products WHERE price > 100;"
                },
                {
                    role: "user", content:  prompt

                }
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating SQL:", error);
        throw new Error("Failed to generate SQL.");
    }
};