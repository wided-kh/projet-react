exports.getUserInfo = async (req, res) => {
    try {
      const userId = req.userId; // ID de l'utilisateur depuis le token
      const user = await User.findById(userId).select("-password"); // Ne pas retourner le mot de passe
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      res.status(200).json(user); // Retourner les informations utilisateur
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur." });
    }
  };