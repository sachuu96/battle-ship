import Joi from 'joi';

export const shipCreationSchema = Joi.object({
    ships: Joi.array()
      .length(3) // need to create exactly 3 ships
      .items(
        Joi.object({
          type: Joi.string().valid('destroyer', 'battle').required(),
          coordinates: Joi.array()
            .items(
              Joi.array()
                .length(2)
                .items(Joi.number().integer().min(0).max(9)) // board starts at 0 ends at 9
            )
            .required()
        })
      ).required(),
      playerId: Joi.number().integer().required()
  });

export const shotCreationSchema = Joi.object({
  playerId: Joi.number().integer().required(),
  xCordinate: Joi.number().integer().min(0).max(9).required(),
  yCordinate: Joi.number().integer().min(0).max(9).required()
})

export const sessionSchema = Joi.object({
  session: Joi.number().integer().required(),
})