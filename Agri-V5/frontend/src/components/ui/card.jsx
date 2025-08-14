// src/components/ui/Card.jsx
export function Card({ children, className = "" }) {
    return (
      <div className={`rounded-lg shadow-sm ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "" }) {
    return (
      <div className={`p-4 ${className}`}>
        {children}
      </div>
    );
  }
  