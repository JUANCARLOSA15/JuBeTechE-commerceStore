import React, { useState } from 'react';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { paperTypes, paperSizes } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FileUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [printType, setPrintType] = useState<'color' | 'blackAndWhite'>('blackAndWhite');
  const [paperType, setPaperType] = useState(paperTypes[0].id);
  const [paperSize, setPaperSize] = useState(paperSizes[0].id);
  const [copies, setCopies] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Calculate price based on selections
  const calculatePrice = () => {
    const basePrice = 0.50; // Base price per page
    const colorMultiplier = printType === 'color' ? 2.5 : 1;
    const paperTypeObj = paperTypes.find(p => p.id === paperType);
    const paperSizeObj = paperSizes.find(p => p.id === paperSize);
    
    const paperTypeMultiplier = paperTypeObj?.priceMultiplier || 1;
    const paperSizeMultiplier = paperSizeObj?.priceMultiplier || 1;
    
    return basePrice * colorMultiplier * paperTypeMultiplier * paperSizeMultiplier * copies;
  };

  const price = calculatePrice();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (fileObj: File) => {
    // Check file size (max 10MB)
    if (fileObj.size > 10 * 1024 * 1024) {
      setError('El archivo es demasiado grande. El tamaño máximo es 10MB.');
      return;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(fileObj.type)) {
      setError('Tipo de archivo no permitido. Sube un PDF, DOC, DOCX, JPG o PNG.');
      return;
    }
    
    setError(null);
    setFile(fileObj);
    setFileName(fileObj.name);
    
    // Create preview for images
    if (fileObj.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(fileObj);
    } else {
      // For documents, just show an icon or placeholder
      setFilePreview(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Por favor, sube un archivo para continuar.');
      return;
    }
    
    // In a real app, you would upload the file to your server here
    // For now, we'll just add it to the cart
    const fileUrl = filePreview || 'placeholder-url';
    
    addToCart({
      id: crypto.randomUUID(),
      productId: 'print-service',
      quantity: 1,
      printJob: {
        fileUrl,
        fileName,
        printType,
        paperType,
        size: paperSize,
        copies,
        price
      }
    });
    
    navigate('/carrito');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Servicio de Impresión</h2>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Sube tu archivo
          </label>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="text-center">
                {filePreview ? (
                  <img 
                    src={filePreview} 
                    alt="Vista previa" 
                    className="max-h-48 mx-auto mb-4 rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">.{fileName.split('.').pop()}</span>
                  </div>
                )}
                <p className="font-medium mb-2">{fileName}</p>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setFileName('');
                    setFilePreview(null);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Eliminar archivo
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-700 mb-2">
                  Arrastra y suelta tu archivo aquí o
                </p>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300">
                  Seleccionar archivo
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                  />
                </label>
                <p className="text-gray-500 text-sm mt-2">
                  PDF, DOC, DOCX, JPG o PNG (máx. 10MB)
                </p>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="printType" className="block text-gray-700 font-medium mb-2">
              Tipo de impresión
            </label>
            <select
              id="printType"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={printType}
              onChange={(e) => setPrintType(e.target.value as 'color' | 'blackAndWhite')}
            >
              <option value="blackAndWhite">Blanco y Negro</option>
              <option value="color">Color</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="paperType" className="block text-gray-700 font-medium mb-2">
              Tipo de papel
            </label>
            <select
              id="paperType"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
            >
              {paperTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="paperSize" className="block text-gray-700 font-medium mb-2">
              Tamaño de papel
            </label>
            <select
              id="paperSize"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
            >
              {paperSizes.map(size => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="copies" className="block text-gray-700 font-medium mb-2">
              Número de copias
            </label>
            <input
              type="number"
              id="copies"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={copies}
              onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Precio estimado:</span>
            <span className="text-2xl font-bold text-blue-600">S/ {price.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            El precio puede variar según el número de páginas del documento.
          </p>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          Solicitar impresión
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;