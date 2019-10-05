const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON:{
        virtuals:true, //faz com q retorne tambem os objetos criado no virtual abaixo
    },
});
//cria uma outra propriedade com nome de thumbnail_url para retornar o caminho da imagem 
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
});
module.exports = mongoose.model('Spot', SpotSchema);