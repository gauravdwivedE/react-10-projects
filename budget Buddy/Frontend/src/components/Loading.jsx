import React from 'react';
import { BarLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div style={styles.overlay}>
            <div style={styles.spinnerContainer}>
                <BarLoader color="#3B82F6" width={300} />
                <p style={styles.text}>Loading...</p>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))', // Darker gradient
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        pointerEvents: 'none', // Prevent user interactions
    },
    spinnerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: '500',
    },
};

export default Loading;
