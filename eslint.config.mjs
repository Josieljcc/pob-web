import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/vitest.config.*.timestamp*',
      '**/test-output'
    ]
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:domain',
              onlyDependOnLibsWithTags: ['scope:domain']
            },
            {
              sourceTag: 'scope:application',
              onlyDependOnLibsWithTags: ['scope:domain', 'scope:application']
            },
            {
              sourceTag: 'scope:infrastructure',
              onlyDependOnLibsWithTags: ['scope:domain', 'scope:infrastructure']
            },
            {
              sourceTag: 'scope:web',
              onlyDependOnLibsWithTags: [
                'scope:domain',
                'scope:application',
                'scope:infrastructure',
                'scope:web'
              ]
            },
            {
              sourceTag: 'scope:web-e2e',
              onlyDependOnLibsWithTags: ['scope:web-e2e']
            }
          ]
        }
      ]
    }
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs'
    ],
    // Override or add rules here
    rules: {}
  }
];
