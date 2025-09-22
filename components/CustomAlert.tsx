import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface CustomAlertProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-scaleUp">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-red-100 border-red-200">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Widget
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Are you sure you want to delete this weather widget? This action cannot be undone.
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleUp {
          animation: scaleUp 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CustomAlert;