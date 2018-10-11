package com.nboxitapp;

import android.app.Application;

import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;



import java.util.Arrays;
import java.util.List;
import com.imagepicker.ImagePickerPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return true;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNImmediatePhoneCallPackage(),
            new VectorIconsPackage(),
              new SmsListenerPackage(),
              new LinearGradientPackage(),
              new MapsPackage(),
              new ImagePickerPackage()
             

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
