"use client";

import CreativeEditorReact, {
  // those things should be not imortant from the integration but the core package
  useConfig,
  useConfigure,
  Configuration,
  CreativeEditorSDK,
} from "./react";

// TODO: remove this asap 
const license = "7ggpfEjPdSnt1DLqQKsLFpOnRFcbGD0ulstX1oFMEciSdsjqtgUUekRLcg8J3ELe";
 
import * as Imgly from "../imgly";

const CaseComponent = () => {
  const config = useConfig(() => {
    return { ...Imgly.config(), license } as Configuration;
  }, []);
  const configure = useConfigure(
    async (instance: CreativeEditorSDK): Promise<void> => {
      await Imgly.configure(instance);

      // await instance.loadFromURL(
      //   `${process.env.NEXT_PUBLIC_URL_HOSTNAME}${process.env.NEXT_PUBLIC_URL}/example-1.scene`
      // );

      
      // we should always create a scene
      let scene = instance.engine.scene.get();
      if (!scene) {
        scene = await instance.engine.scene.create();
        let page = instance.engine.block.create("page");
        instance.engine.block.appendChild(scene, page);
      }

      window.imgly = instance;
    },
    []
  );

  return (
    <div className="cesdkWrapperStyle">
      <CreativeEditorReact
        className="cesdkStyle"
        config={config}
        configure={configure}
      />
    </div>
  );
};

export default CaseComponent;
