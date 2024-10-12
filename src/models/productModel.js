import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({ 
  quantityStock: {
    type: Number,
    default: 10,
    min: [0, 'O valor deve ser positivo']
  }
}, { 
  strict: false 
})

export default mongoose.models.ProductSchema || mongoose.model('Product', ProductSchema)