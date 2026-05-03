import AppDataSource from "../config/data-source.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userRepository = AppDataSource.getRepository("User");
    
    const newUser = userRepository.create({ name, email, password });
    const savedUser = await userRepository.save(newUser);
    
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error: error.message });
  }
};