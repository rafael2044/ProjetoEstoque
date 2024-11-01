
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type, onClose, duration }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar
  }, [duration, onClose]);

  const alertStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1050, // Para garantir que fique acima de outros elementos
  };

  return (
    <div style={alertStyles} className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message.split('\n').length === 2? message.split('\n').map(mes=><p key={mes}>{mes}</p>): <p>{message}</p>}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger']).isRequired, // 'danger' para erro
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Alert;
