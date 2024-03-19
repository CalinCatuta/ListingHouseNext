import connectDB from "@/config/database";
import Property from "@/models/Property";

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB(); // Connect to the database

    const { searchParams } = new URL(request.url); // Parse URL search parameters

    // Extract location and propertyType from search parameters
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    // Create a regular expression for case-insensitive location matching
    const locationPattern = new RegExp(location, "i");

    // Build the query to search for properties based on location
    let query = {
      $or: [
        // Use $or operator for multiple location fields
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Optionally filter by property type (if not 'All')
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i"); // Case-insensitive property type pattern
      query.type = typePattern;
    }

    // Find properties matching the query
    const properties = await Property.find(query);

    // Return the properties as JSON in the response
    return Response.json(properties);
  } catch (error) {
    console.log(error); // Log the error for debugging
    return new Response("Something went wrong", { status: 500 }); // Send error response with status code 500
  }
};
