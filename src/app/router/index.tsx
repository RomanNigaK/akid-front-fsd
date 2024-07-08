import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './protectedRoute';
import { MainLayout } from 'app/layout/main-layout';
import { Set } from 'pages/set';
import { AuthLayout } from 'app/layout/auth-layout';
import SignIn from 'pages/sign-in';
import SignUp from 'pages/sign-up';
import SuccessRegistration from 'pages/success-registration';
import { SetProvider } from 'app/provider/SetProvider';
import { WorkPage } from 'pages/work';
import { MaterialPage } from 'pages/material';
import { DocumentPage } from 'pages/document';
import { OptionKitPage } from 'pages/option-kit';
import { CapturePage } from 'pages/capture';
import { ReqistryPage } from 'pages/reqistry';
import { ProfilePage } from 'pages/profile';
import { Template } from 'pages/template';
import { Employee } from 'pages/employee';

export const getHomeUrl = () => '/';
export const getProfileUrl = () => '/profile';
export const getTemplateUrl = () => '/template';
export const getEmployeeUrl = () => '/employee';

export const getWorkUrl = (kitId: string) => `/kit/${kitId}/work`;
export const getMaterialUrl = (kitId: string) => `/kit/${kitId}/material`;
export const getDocumentUrl = (kitId: string) => `/kit/${kitId}/document`;
export const getOptionKitUrl = (kitId: string) => `/kit/${kitId}/option-kit`;
export const getCaptureUrl = (kitId: string) => `/kit/${kitId}/capture`;
export const getReqistryUrl = (kitId: string) => `/kit/${kitId}/reqistry`;

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <SignIn /> },
      { path: 'registration', element: <SignUp /> },
      { path: 'forgot-password', element: <SignUp /> },
      { path: 'success', element: <SuccessRegistration /> },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Set /> },
      {
        path: 'kit/:kitId/work',
        element: (
          <SetProvider>
            <WorkPage />
          </SetProvider>
        ),
      },
      {
        path: 'kit/:kitId/material',
        element: (
          <SetProvider>
            <MaterialPage />
          </SetProvider>
        ),
      },
      {
        path: 'kit/:kitId/document',
        element: (
          <SetProvider>
            <DocumentPage />
          </SetProvider>
        ),
      },
      {
        path: 'kit/:kitId/option-kit',
        element: (
          <SetProvider>
            <OptionKitPage />
          </SetProvider>
        ),
      },
      {
        path: 'kit/:kitId/capture',
        element: (
          <SetProvider>
            <CapturePage />
          </SetProvider>
        ),
      },
      {
        path: 'kit/:kitId/reqistry',
        element: (
          <SetProvider>
            <ReqistryPage />
          </SetProvider>
        ),
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'template',
        element: <Template />,
      },
      {
        path: 'employee',
        element: <Employee />,
      },
    ],
  },
]);
