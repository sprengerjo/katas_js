import * as fs from 'fs';
import * as R from 'ramda';

import {InvocationContainer} from 'addict-ioc';
import {ExecutionContext} from '@essential-projects/core_contracts';

const iocModuleNames: Array<string> = [
  '@essential-projects/bootstrapper',
  '@essential-projects/bootstrapper_node',
  '@essential-projects/caching',
  '@essential-projects/core',
  '@essential-projects/data_model',
  '@essential-projects/data_model_contracts',
  '@essential-projects/datasource_adapter_base',
  '@essential-projects/datasource_adapter_postgres',
  '@essential-projects/datastore',
  '@essential-projects/datastore_http',
  '@essential-projects/datastore_messagebus',
  '@essential-projects/event_aggregator',
  '@essential-projects/feature',
  '@essential-projects/http_extension',
  '@essential-projects/http_integration_testing',
  '@essential-projects/iam',
  '@essential-projects/iam_http',
  '@essential-projects/invocation',
  '@essential-projects/messagebus',
  '@essential-projects/messagebus_http',
  '@essential-projects/messagebus_adapter_faye',
  '@essential-projects/metadata',
  '@essential-projects/pki_service',
  '@essential-projects/security_service',
  '@essential-projects/services',
  '@essential-projects/routing',
  '@essential-projects/timing',
  '@essential-projects/validation',
  '@process-engine/consumer_api_client',
  '@process-engine/consumer_api_core',
  '@process-engine/consumer_api_http',
  '@process-engine/process_engine',
  '@process-engine/process_engine_http',
  '@process-engine/process_repository'
];

const iocModules = iocModuleNames.map((moduleName) => {
  const pathToIoCModule = `${moduleName}/ioc_module`;
  return require(pathToIoCModule);
});


export class ProcessEngine {
  private context: ExecutionContext;
  private processEngineService: any;

  public async initialize(): Promise<void> {
    const container = new InvocationContainer({
      defaults: {
        conventionCalls: ['initialize'],
      },
    });

    const fileNames = ['fizzy.bpmn', 'fizzy_upto.bpmn'];

    for (const name of fileNames) {
      const processFilePath = './src/process_engine/' + name;
      const bpmn = fs.readFileSync(processFilePath, 'utf8');
      await container.registerObject('boilerplate', bpmn)
        .setTag('bpmn_process', 'internal')
        .setTag('path', processFilePath);
    }

    for (const iocModule of iocModules) {
      iocModule.registerInContainer(container);
    }

    container.validateDependencies();

    try {
      const bootstrapper: any = await container.resolveAsync('AppBootstrapper');
      await bootstrapper.start();

      const iamService: any = await container.resolveAsync('IamService');

      iamService.authService.getIdentity = R.always({});
      iamService.hasClaim = R.always(true);

      this.processEngineService = await container.resolveAsync('ProcessEngineService');
      this.context = await iamService.createInternalContext('lizard');
    }
    catch (error) {
      // nothing to be done
      console.error(error);
    }
  }

  execute(fizzy: string): Function {
    return async(actual) => await this.processEngineService.executeProcess(this.context, undefined, fizzy, actual);
  }
}