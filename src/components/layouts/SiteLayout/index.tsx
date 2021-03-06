import Head from 'next/head'
import React from 'react'
import { Layout } from 'antd'
import { createClient } from '@urql/core'
import urljoin from 'url-join'
import { Provider } from 'urql'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

import { getServerEndPoint } from '../../../utils/getServerEndPoint'
import Header from './Header'

export default function SiteLayout({ children }: { children: any }) {
  const client = createClient({
    url: urljoin(getServerEndPoint(), 'graphql'),
    requestPolicy: 'network-only',
    fetchOptions: () => {
      return {
        credentials: 'include',
      }
    },
  })
  const { xs } = useBreakpoint()
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <Layout className={'mh-100vh'}>
        <Layout.Header className={'mb-3'}>
          {/* TODO: Without Provider, useEffect is not running in useUser hook, figure out why */}
          <Provider value={client}>
            <Header />
          </Provider>
        </Layout.Header>
        <br />
        <Layout.Content className={`pt-3 py-2 ${xs ? 'px-2' : 'px-5'} h-100p`}>
          {children}
        </Layout.Content>
      </Layout>
    </>
  )
}

const getLayout = (page: any) => <SiteLayout>{page}</SiteLayout>
export { getLayout as getSiteLayout }
