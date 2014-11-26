#include <string.h>
#include <jni.h>
#include <dlfcn.h>
#include <android/log.h>

void *handle;
typedef int (*func)(int); // define function prototype
func myFunctionName; // some name for the function
#define  LOG_TAG    "switchMain.cpp"
#define  LOGD(...)  __android_log_print(ANDROID_LOG_DEBUG,LOG_TAG,__VA_ARGS__)

extern "C" {
	JNIEXPORT void JNICALL Java_org_cocos2dx_lib_Cocos2dxSoHelper_openCocosSo(JNIEnv*  env, jobject thiz, jobject classLoader, jobject assetManager) {
        LOGD("openCocos2d start");
		handle = dlopen("/data/data/com.cocos.EngineTest/lib/libcocos2djs.so", RTLD_LAZY);
		LOGD("openCocos2d end");
    }
	JNIEXPORT void JNICALL Java_org_cocos2dx_lib_Cocos2dxSoHelper_closeCocosSo(JNIEnv*  env, jobject thiz, jobject classLoader, jobject assetManager) {
        dlclose(handle);
    }
}
