import validateFrameMessage from "./../utils/validateFrameMessage";

export default function handler(req, res) {
  if (req.method === "POST") {
    if (!validateFrameMessage(req.body)) {
      console.log("Invalid frame message");
      return res.status(400).json({ error: "Invalid frame message" });
    }

    let parentAddress = null;
    let stateData = null;
    try {
      const { untrustedData } = req.body;
      console.log("Untrusted data:", untrustedData);

      if (untrustedData.state) {
        const decodedState = decodeURIComponent(untrustedData.state);
        console.log("Decoded state:", decodedState);

        stateData = JSON.parse(decodedState);
        console.log("Parsed state:", stateData);
      } else {
        console.log("No state data found in untrustedData");
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    const queryParams = new URLSearchParams();
    if (parentAddress) {
      queryParams.append("parent", parentAddress);
    }
    if (stateData) {
      queryParams.append("state", JSON.stringify(stateData));
    }

    const url = `https://app.magi.lol/action?${queryParams.toString()}`;

    const response = {
      type: "form",
      title: "Magi",
      url: url,
    };

    console.log("Sending response:", response);
    res.status(200).json(response);
  } else if (req.method === "GET") {
    res.status(200).json({
      type: "composer",
      name: "Magi",
      icon: "flame",
      description: "Memes search engine",
      aboutUrl: "https://app.magi.lol",
      imageUrl: "https://app.magi.lol/ACTION.png",
      action: {
        type: "post",
      },
    });
  } else {
    res.status(405).end();
  }
}
