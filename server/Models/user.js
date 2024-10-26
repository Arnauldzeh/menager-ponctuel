const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    genre: { type: String, enum: ["Homme", "Femme", "Autre"], required: true },
    ville: { type: String, required: true },
    quartier: { type: String, required: true },
    domaineTravail: { type: String, required: true },
    estEtudiant: { type: Boolean, default: false },
    cniRecto: { type: String, required: true },
    cniVerso: { type: String, required: true },
    disponibilite: [
      {
        jour: { type: String, required: true },
        heures: { type: String, required: true },
      },
    ],
    motDePasse: { type: String, required: true }, // hashed password
    codeMenager: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
