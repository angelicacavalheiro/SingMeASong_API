import Joi from 'joi';

const recommendationSchema = Joi.object().keys({
  name: Joi.string().min(1).max(75).required(),
  youtubeLink: Joi.string().regex(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/),
});

export {
  recommendationSchema,
};
