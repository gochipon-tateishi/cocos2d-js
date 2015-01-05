package com.cocos.EngineTest;

import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxSoHelper;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import com.tencent.smtt.export.external.interfaces.IGameEngine;

public class CurProcessActivity extends Activity {
	
	// ok. can use java vm
	static IGameEngine gameEngineSource = null;
	
	@Override
	protected void onDestroy() {
		this.setContentView(new LinearLayout( this ));
		// TODO Auto-generated method stub
		super.onDestroy();
		
	}

	public void delayRun(final Runnable runable, final long delayTime)
	{
		new Thread(new Runnable() {

			@Override
			public void run() {
				try {
					Thread.sleep(delayTime);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				CurProcessActivity.this.runOnUiThread(new Runnable() {
					
					@Override
					public void run() {
						runable.run();
					}
				});
				
			}
			
		}).start();
	}
	
	public void startHelloWorldNormal()
	{
		final IGameEngine gameEngine = DexLoaderHelper.getGameEngine(this);
		View view = gameEngine.game_engine_get_view();
		setContentView(view);
	}
	
	public void startHelloWorldNewView()
	{
		// ok. can use java vm
		final IGameEngine gameEngine = DexLoaderHelper.getGameEngine(this);
		final View view = gameEngine.game_engine_get_view();
		setContentView(view);
		delayRun(new Runnable() {
			
			@Override
			public void run() {
				setContentView(new LinearLayout( CurProcessActivity.this ));
				IGameEngine gameEngine2 = DexLoaderHelper.getGameEngine(CurProcessActivity.this);
				setContentView(gameEngine2.game_engine_get_view());
				delayRun(new Runnable() {
					
					@Override
					public void run() {
//						IGameEngine gameEngine2 = DexLoaderHelper.getGameEngine(CurProcessActivity.this);
//						setContentView(gameEngine2.game_engine_get_view());
//						delayRun(new Runnable() {
//							
//							@Override
//							public void run() {
//								startHelloWorldNewView();
//							}
//						}, 5000);
					}
				},10000);
			}
		}, 20000);
	}
	
	public void startHelloWorldSingalView()
	{
		if (gameEngineSource == null)
		{
			gameEngineSource = DexLoaderHelper.getGameEngine(this);
		}
		final IGameEngine gameEngine = gameEngineSource;
		View view = gameEngineSource.game_engine_get_view();
		setContentView(view);
		
		delayRun(new Runnable() {
			
			@Override
			public void run() {
				gameEngine.game_engine_destory();
				delayRun(new Runnable() {
					
					@Override
					public void run() {
						CurProcessActivity.this.setContentView(new LinearLayout( CurProcessActivity.this ));
						delayRun(new Runnable() {
							
							@Override
							public void run() {
								startHelloWorldSingalView();
							}
						}, 5000);
					}
				},2000);
			}
		}, 15000);
	}
	
	public void testSoLoad()
	{
		Cocos2dxSoHelper.openCocosSo();
		Cocos2dxHelper.nativeSetApkPath("11111111111");
		Cocos2dxSoHelper.closeCocosSo();
	}
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//startHelloWorldSingalView();
		//startHelloWorldNewView();
		//startHelloWorldNormal();
		//System.loadLibrary("cocos2djs");
		System.loadLibrary("switch");
		testSoLoad();
	}
}
