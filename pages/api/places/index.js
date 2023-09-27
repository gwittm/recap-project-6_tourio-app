import dbConnect from "@/db/dbConnect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const places = request.body;
      await Place.create(places);
      response.status(201).json({ status: "New Place created" });
    } catch (error) {
      console.error(error);
      response
        .status(400)
        .json({ status: `Something went wrong: ${error.message}` });
    }
  }
}
