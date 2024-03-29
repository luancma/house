import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AuthProvider } from  "./src/AuthContext"

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider
    mockedSession={{
      access_token: "111",
      expires_in: 32131321,
      refresh_token: "222",
      token_type: "test",
      user: {
        id: "1",
        app_metadata: {},
        aud: "",
        created_at: "1",
        user_metadata: {},
      },
    }}
  >
    {children} 
  </AuthProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }