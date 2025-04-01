
import React from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
