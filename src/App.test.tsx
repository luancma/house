import React from 'react';
import { render } from '@testing-library/react';
import Month from './pages/Month/Month';

test('renders without crashing', () => {

  jest.mock('./hooks/useSupabaseSession', () => ({
    useSupabaseSession: jest.fn(() => ({
      session: {
        access_token: "mock_access_token",
        expires_in: 32131321,
        refresh_token: "mock_refresh_token",
        token_type: "mock_token_type",
        user: {
          id: "mock_user_id",
          app_metadata: {},
          aud: "mock_aud",
          created_at: "mock_created_at",
          user_metadata: {},
        },
      }
    })),
  }));

  const { baseElement } = render(<Month />);
  expect(baseElement).toBeDefined();
});
