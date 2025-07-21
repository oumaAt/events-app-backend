export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body || {});
    next();
  } catch (err) {
    console.error(err);
    if (err.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors?.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    res.status(500).json({ message: "Unexpected server error" });
  }
};
