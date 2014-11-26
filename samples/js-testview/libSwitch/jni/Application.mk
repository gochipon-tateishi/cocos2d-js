APP_STL := gnustl_static

#use clang by default, uncomment next line to use gcc4.8
#NDK_TOOLCHAIN_VERSION=4.8
NDK_TOOLCHAIN_VERSION=clang

APP_CPPFLAGS := -frtti -DCC_ENABLE_CHIPMUNK_INTEGRATION=1 -std=c++11 -fsigned-char
APP_LDFLAGS := -latomic
