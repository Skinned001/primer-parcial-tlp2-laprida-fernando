import { body, param } from "express-validator";

export const createAssetValidation = [
  // TODO: completar las validaciones para crear un recurso
  body("inventory_number")
    .notEmpty()
    .withMessage("El title es obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion es entre minimo 10 caracters y maximo 500"),
  body("brand")
    .notEmpty()
    .withMessage("La brand es obligatoria")
    .isLength({ min: 2, max: 100 })
    .withMessage("La brand es entre minimo 2 caracters y maximo 100"),
  body("model")
    .notEmpty()
    .withMessage("El model es obligatoria")
    .isLength({ min: 2, max: 100 })
    .withMessage("El model es entre minimo 2 caracters y maximo 100"),
  body("status")
    .notEmpty()
    .withMessage("El status es obligatorio")
    .custom(async (value) => {
      const admittedStatuses = ["good", "regular", "bad", "out_of_service"];
      if (!admittedStatuses.includes(value)) {
        throw new Error("Solo se permiten los valores good, regular, bad, out_of_service");
      }
    }),
  body("acquisition_date")
    .notEmpty
    .withMessage("La fecha de aquisiion es obligatoria"),
  body("responsible_id"),
    
  body("categories")
];


// ● inventory_number: formato específico, único, obligatorio
// ● description: 10-500 caracteres, obligatorio
// ● brand y model: 2-100 caracteres, obligatorio
// ● status: valores permitidos ('good', 'regular', 'bad', 'out_of_service')
// ● acquisition_date: fecha válida, no futura, obligatorio
// ● acquisition_value: número positivo, obligatorio
// ● responsible_id: debe existir y ser funcionario activo
// ● categories: array de IDs válidos de categorías existentes