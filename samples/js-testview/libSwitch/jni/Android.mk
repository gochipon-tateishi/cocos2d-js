LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := js_tests_shared

LOCAL_MODULE_FILENAME := libswitch

LOCAL_SRC_FILES := switchMain.cpp

LOCAL_C_INCLUDES := 

LOCAL_LDLIBS := -llog

include $(BUILD_SHARED_LIBRARY)
