1) в этом примере я дописал "lib": ["es2016"] в tsconfig.json, storm ругаться перестал на includes, 
но если использовать для транспиляции глобально установленный 
typescipt (tsc includesExample.ts), то он будет ругаться и includes не увидит.
