import * as path from "path";
import * as fs from "fs";
import * as swaggerUi from "swagger-ui-express";
export const BootstrapSwagger = (app) => {
  try {
    // Make sure path is correctly imported using CommonJS syntax
    console.log('Current working directory:', process.cwd());
    const filePath = path.join(process.cwd(), '/docs/openapi.json');
    
    if (!fs.existsSync(filePath)) {
      console.error('⚠️ swagger.json file not found at:', filePath);
      return; // Early return to avoid the error
    }
    
    const swaggerDocument = JSON.parse(
      fs.readFileSync(filePath, 'utf8'),
    );
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.error('Error in BootstrapSwagger:', error);
  }
}