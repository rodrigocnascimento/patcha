declare module '@npmcli/arborist' {
  export class Arborist {
    constructor(options: {
      path: string;
      legacyPeerDeps?: boolean;
    });
    loadActual(): Promise<any>;
  }
}
