import React from 'react';
import { Outlet } from 'react-router-dom';

const ResumeLayout: React.FC = () => {
    return (
        <div style={{ width: '100%' }}>
            <Outlet />
        </div>
    );
};

export default ResumeLayout;
