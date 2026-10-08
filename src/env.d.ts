interface ImportMetaEnv {
  /** Identificador de Cloudflare Web Analytics. Sin él no se carga ninguna analítica. */
  readonly PUBLIC_CF_BEACON_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
