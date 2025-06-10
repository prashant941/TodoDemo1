export const AsyncHandler = (requsetHandler) => async (req, res, next) => {
  try {
    return await requsetHandler(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
};




