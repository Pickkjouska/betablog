---
title: NewStar的re
description: NewStar比赛中reverse的部分wp
---

# Week 1

## ELF

查包没有加密，那就通过IDA打开

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  unsigned int v3; // edx
  char *s1; // [rsp+0h] [rbp-20h]
  char *v6; // [rsp+8h] [rbp-18h]
  char *s; // [rsp+10h] [rbp-10h]

  s = malloc(0x64uLL);
  printf("Input flag: ");
  fgets(s, 100, stdin);
  s[strcspn(s, "\n")] = 0;
  v6 = encode(s);
  v3 = strlen(v6);
  s1 = base64_encode(v6, v3);
  if ( !strcmp(s1, "VlxRV2t0II8kX2WPJ15fZ49nWFEnj3V8do8hYy9t") )
    puts("Correct");
  else
    puts("Wrong");
  free(v6);
  free(s1);
  free(s);
  return 0;
}
```

发现输入的flag，通过一次自定义加密和base64之后值一样就正确，那再看看自定义加密encode

```c
_BYTE *__fastcall encode(const char *a1)
{
  size_t v1; // rax
  int v2; // eax
  _BYTE *v4; // [rsp+20h] [rbp-20h]
  int i; // [rsp+28h] [rbp-18h]
  int v6; // [rsp+2Ch] [rbp-14h]

  v1 = strlen(a1);
  v4 = malloc(2 * v1 + 1);
  v6 = 0;
  for ( i = 0; i < strlen(a1); ++i )
  {
    v2 = v6++;
    v4[v2] = (a1[i] ^ 0x20) + 16;
  }
  v4[v6] = 0;
  return v4;
}
```

可以直接编写脚本跑出flag，解得flag

```py
import base64


def base64_to_hex(payload_base64):
    bytes_out = base64.b64decode(payload_base64)
    str_out = bytes_out.hex()
    print("base64_to_hex:", str_out)
    return str_out


def cut(obj, sec):
    return [obj[i:i + sec] for i in range(0, len(obj), sec)]


str1 = "VlxRV2t0II8kX2WPJ15fZ49nWFEnj3V8do8hYy9t"
s1 = base64_to_hex(str1)
s2 = cut(s1, 2)
flag = ""
for i in range(len(s2)):
    flag += chr((int(s2[i], 16) - 16) ^ 0x20)
print(flag)
```

## Segments

根据提示，直接shift+f9，发现flag就在里面了

![Alt text](image/2.png)

## 咳

先放进kali里面upx脱壳，再放进IDA里面，查看主函数

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  unsigned __int64 i; // r10
  char *v4; // kr00_8
  char Str1[96]; // [rsp+20h] [rbp-88h] BYREF
  int v7; // [rsp+80h] [rbp-28h]

  _main();
  memset(Str1, 0, sizeof(Str1));
  v7 = 0;
  Hello();
  scanf("%s", Str1);
  for ( i = 0i64; ; ++i )
  {
    v4 = &Str1[strlen(Str1)];
    if ( i >= v4 - Str1 )
      break;
    ++Str1[i];
  }
  if ( !strncmp(Str1, enc, v4 - Str1) )
    puts("WOW!!");
  else
    puts("I believe you can do it!");
  system("pause");
  return 0;
}
```

一个简单的加密，直接编写脚本跑出flag

```py
enc = "gmbh|D1ohsbuv2bu21ot1oQb332ohUifG2stuQ[HBMBYZ2fwf2~"
flag = ""
for i in range(len(enc)):
    flag += chr(ord(enc[i])-1)
print(flag)
```

## Endian

放进IDA查看主函数

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int i; // [rsp+4h] [rbp-3Ch]
  char *v5; // [rsp+8h] [rbp-38h]
  char v6[40]; // [rsp+10h] [rbp-30h] BYREF
  unsigned __int64 v7; // [rsp+38h] [rbp-8h]

  v7 = __readfsqword(0x28u);
  puts("please input your flag");
  __isoc99_scanf("%s", v6);
  v5 = v6;
  for ( i = 0; i <= 4; ++i )
  {
    if ( *(_DWORD *)v5 != (array[i] ^ 0x12345678) )
    {
      printf("wrong!");
      exit(0);
    }
    v5 += 4;
  }
  printf("you are right");
  return 0;
}
```

可以得到输入的flag通过和0x12345678异或之后来判断是否满足条件，这里有一个坑是低位储存，所以在后面的处理要反过来，脚本编写，解得flag

```py
from Crypto.Util.number import long_to_bytes

l = [0x75553A1E, 0x7B583A03, 0x4D58220C, 0x7B50383D, 0x736B3819]
key = 0x12345678
result = ''
for i in l:
    result += long_to_bytes(i ^ key).decode()[::-1]
print(result)
```

## EzPE

查包发现这个程序运行不了，感觉是文件头给更改了，用010打开，然后将任意.exe文件头替换为EzPE的程序头，只需要替换前四行，然后就可以运行了，放进IDA中查看

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int i; // [rsp+2Ch] [rbp-4h]

  _main(argc, argv, envp);
  puts(&draw);
  puts("Please enter your flag!\n");
  scanf("%s", input);
  for ( i = 0; i < strlen(input) - 1; ++i )
    input[i] ^= i ^ input[i + 1];               // input[i] = input[i] ^ i ^ input[i+1]
  if ( !strcmp(input, data) )
    puts("You Win!");
  else
    puts("You lose!");
  system("pause");
  return 0;
}
```

很简单的XOR，直接编写脚本了，成功解得flag

```py
data = [0x0A, 0x0C, 0x04, 0x1F, 0x26, 0x6C, 0x43, 0x2D, 0x3C, 0x0C,
        0x54, 0x4C, 0x24, 0x25, 0x11, 0x06, 0x05, 0x3A, 0x7C, 0x51,
        0x38, 0x1A, 0x03, 0x0D, 0x01, 0x36, 0x1F, 0x12, 0x26, 0x04,
        0x68, 0x5D, 0x3F, 0x2D, 0x37, 0x2A, 0x7D]
flag = ""
for i in range(len(data) - 2, -1, -1):
    data[i] ^= data[i + 1] ^ i

for i in range(len(data)):
    flag += chr(data[i])
print(flag)
```

## AndXOR

```c
#include<stdio.h>
int main()
{
    char cArr[] = {14, '\r', 17, 23, 2, 'K', 'I', '7', ' ', 30, 20, 'I', '\n', 2, '\f', '>', '(', '@', 11, '\'', 'K', 'Y', 25, 'A', '\r'};
    char str2[] = {"happyx3"};
    for (int i = 0; i < 25; i++) {
        char charAt = (char) (cArr[i] ^ str2[i % 7]);
        printf("%c", charAt);   
    }
}
```

可以直接编写脚本跑出flag

# Week 2

## PZthon

python的exe逆向，先通过**pyinstxtractor.py**反汇编成.pyc的文件，因为我的uncompyle6不支持python3.9以上的反编译，所以找了一个[在线网站](https://tool.lu/pyc/)跑出了python文件

看py文件是一个很简单的xor，直接跑脚本可以得到flag{Y0uMade1tThr0ughT2eSec0ndPZGALAXY1eve1T2at1sC001}

## SMC

32位的，直接进IDA查看

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  DWORD *v3; // eax

  v3 = malloc(0x26u);
  VirtualProtect(sub_403040, 0x26u, 0x40u, v3);
  puts("Please enter your flag:");
  sub_401025("%s", &byte_4033D4);
  if ( NtCurrentPeb()->BeingDebugged )
  {
    MessageBoxA(0, "Debug Detected!", "Warning!", 0);
    Sleep(0x1388u);
    exit(0);
  }
  sub_401042();
  if ( sub_403040(&byte_4033D4, &byte_403020) )
    puts("Win!");
  else
    puts("Lose!");
  return system("pause");
}

char sub_401042()
{
  int i; // ecx
  char result; // al

  for ( i = 0; i < 38; ++i )
  {
    result = byte_403068[i & 3];
    sub_403040[i] ^= result;
  }
  return result;
}
```

然后发现在sub_401042函数处发现了对后续程序数据更改的操作，就是SMC

在IDA里面跑个脚本先把数据还原回去

```c
static xor()
{
    auto st = 0x00403040;   // 起始地址
    auto by = 0x00403068;
    auto i = 0;
    auto result;
    for (i = 0; i < 38; ++i)
    {
        result = i % 4;
        PatchByte(st + i,Byte(st + i) ^ Byte(by + result));
    }
}
static main()
{
    xor();
}
```

然后得到了全新的函数sub_403040

```c
char sub_403040()
{
  int v0; // edx

  v0 = 0;
  while ( (byte_4033D4[v0] ^ 0x11) + 5 == byte_403020[v0] )
  {
    if ( ++v0 >= 32 )
      return 1;
  }
  return 0;
}
```

简单的xor，可以获得flag

```py
str1 = [0x7C, 0x82, 0x75, 0x7B, 0x6F, 0x47, 0x61, 0x57, 0x53, 0x25,
        0x47, 0x53, 0x25, 0x84, 0x6A, 0x27, 0x68, 0x27, 0x67, 0x6A,
        0x7D, 0x84, 0x7B, 0x35, 0x35, 0x48, 0x25, 0x7B, 0x7E, 0x6A,
        0x33, 0x71]
flag = ""
for i in range(len(str1)):
    flag += chr((str1[i] - 5) ^ 0x11)
print(flag)
```

## Petals

放进IDA查看，发现了很多的红色代码，可以通过python脚本把jnx和jx花指令处全部去掉

可以发现两处函数需要注意的

```c
unsigned __int64 __fastcall sub_1209(__int64 a1, unsigned int a2)
{
  int i; // [rsp+18h] [rbp-118h]
  unsigned int j; // [rsp+1Ch] [rbp-114h]
  __int64 v5[33]; // [rsp+20h] [rbp-110h] BYREF
  unsigned __int64 v6; // [rsp+128h] [rbp-8h]

  v6 = __readfsqword(0x28u);
  memset(v5, 0, 256);
  for ( i = 0; i <= 255; ++i )
    *(v5 + i) = ~(i ^ a2);
  for ( j = 0; a2 > j; ++j )
    *(j + a1) = *(v5 + *(j + a1));
  return v6 - __readfsqword(0x28u);
}


__int64 __fastcall sub_1421(__int64 a1, unsigned int a2)
{
  __int16 v2; // kr00_2
  __int16 v3; // kr02_2
  __int16 v4; // kr04_2
  __int64 result; // rax
  unsigned int i; // [rsp+18h] [rbp-4h]

  for ( i = 0; ; ++i )
  {
    result = i;
    if ( a2 <= i )
      break;
    *(i + a1) = (*(i + a1) << 7) | (*(i + a1) >> 1);
    *(i + a1) ^= 0xFAu;
    v2 = *(i + a1) << 6;
    *(i + a1) = v2 | HIBYTE(v2);
    *(i + a1) ^= 0x11u;
    v3 = 32 * *(i + a1);
    *(i + a1) = v3 | HIBYTE(v3);
    *(i + a1) ^= 0x77u;
    v4 = 16 * *(i + a1);
    *(i + a1) = v4 | HIBYTE(v4);
    *(i + a1) ^= 0x64u;
    *(i + a1) ^= *((i + 1) % a2 + a1);
  }
  return result;
}
```

主要的地方还是第一个函数加密了，还是照旧跑脚本

```c
#include<stdio.h>
#include<string.h>
int find(char *v5, char a){
    for (int j = 0; j < 256; ++j){
            if (v5[j] == a){
                return j;
            }
        }
}
int main(){
    char v5[33];
    unsigned char x[] = {
    0xD0, 0xD0, 0x85, 0x85, 0x80, 0x80, 0xC5, 0x8A, 0x93, 0x89, 0x92, 0x8F, 0x87, 0x88, 0x9F, 0x8F, 
    0xC5, 0x84, 0xD6, 0xD1, 0xD2, 0x82, 0xD3, 0xDE, 0x87
    };
    memset(v5, 0, 256);
      for (int i = 0; i <= 255; i++ )
        v5[i] = ~(i ^ 25);
    for (int i = 0; i < 25; ++i){
        x[i] = find(v5, x[i]);
    }
    printf("%s", x);
}
```

但是没解出来，也不知道错哪了Orz

## C?C++?

查包发现这是一个C#编写的程序，那放进dnsPY里直接查看主函数

```c
// ConsoleApp1.Program
// Token: 0x06000001 RID: 1 RVA: 0x00002050 File Offset: 0x00000250
private static void Main(string[] args)
{
    int num = 35;
    int[] array = new int[]
    {
        68,
        75,
        66,
        72,
        99,
        19,
        19,
        78,
        83,
        74,
        91,
        86,
        35,
        39,
        77,
        85,
        44,
        89,
        47,
        92,
        49,
        88,
        48,
        91,
        88,
        102,
        105,
        51,
        76,
        115,
        -124,
        125,
        79,
        122,
        -103
    };
    char[] array2 = new char[35];
    int[] array3 = new int[35];
    Console.Write("Input your flag: ");
    string text = Console.ReadLine();
    for (int i = 0; i < text.Length; i++)
    {
        array2[i] = text[i];
    }
    string text2 = "NEWSTAR";
    for (int j = 0; j < num; j++)
    {
        char[] array4 = array2;
        int num2 = j;
        array4[num2] += (char)j;
        char[] array5 = array2;
        int num3 = j;
        array5[num3] -= ' ';
    }
    for (int k = 0; k < 7; k++)
    {
        char[] array6 = array2;
        int num4 = k;
        array6[num4] += (char)(k ^ (int)(-(int)(text2[k] % '\u0004')));
        char[] array7 = array2;
        int num5 = k + 7;
        array7[num5] += text2[k] % '\u0005';
        char[] array8 = array2;
        int num6 = k + 14;
        array8[num6] += (char)(2 * k);
        char[] array9 = array2;
        int num7 = k + 21;
        array9[num7] += (char)(k ^ 2);
        char[] array10 = array2;
        int num8 = k + 28;
        array10[num8] += text2[k] / '\u0005' + '\n';
    }
    for (int l = 0; l < num; l++)
    {
        int num9 = (int)array2[l];
        array3[l] = num9;
    }
    for (int m = 0; m < 35; m++)
    {
        bool flag = m == 34 && array3[m] == array[m];
        if (flag)
        {
            Console.WriteLine("Right!");
        }
        bool flag2 = array3[m] == array[m];
        if (!flag2)
        {
            Console.WriteLine("Wrong!");
            break;
        }
    }
}
```

可以看出是一个用户自定义的flag加密，直接编写脚本可以跑出flag

```c
#include<stdio.h>
#include<string.h>

int main(){
    int array[] = {    68,    75,    66,    72,    99,    19,    19,    78,    83,    74,    91,    86,    35,    39,    77,    85,    44,    89,    47,    92,
        49,    88,    48,    91,    88,    102, 105, 51, 76,115, -124, 125, 79, 122, -103};
    int num = 35;
    char text[] = "NEWSTAR";
    for (int i = 0; i < 7; i++){
        array[i] -=  i ^ (- text[i] % 4);
        array[i + 7] -= text[i] % 5;
        array[i + 14] -= 2 * i;
        array[i + 21] -= 2 ^ i;
        array[i + 28] -= text[i] / 5 + '\n';
    }
    for (int i = 0; i < num; i++){
        array[i] += ' ';
        array[i] -= i;
        printf("%c", array[i]);
    }
}
```

成功解得flag

## R4ndom

放进IDA查看主函数

```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v3; // bl
  int v4; // eax
  int i; // [rsp+Ch] [rbp-94h]
  __int64 s2[6]; // [rsp+10h] [rbp-90h] BYREF
  __int16 v8; // [rsp+40h] [rbp-60h]
  char s[8]; // [rsp+50h] [rbp-50h] BYREF
  __int64 v10; // [rsp+58h] [rbp-48h]
  __int64 v11; // [rsp+60h] [rbp-40h]
  __int64 v12; // [rsp+68h] [rbp-38h]
  __int64 v13; // [rsp+70h] [rbp-30h]
  __int64 v14; // [rsp+78h] [rbp-28h]
  __int16 v15; // [rsp+80h] [rbp-20h]
  unsigned __int64 v16; // [rsp+88h] [rbp-18h]

  v16 = __readfsqword(0x28u);
  s2[0] = 0x3513AB8AB2D7E6EELL;
  s2[1] = 0x2EEDBA9CB9C97B02LL;
  s2[2] = 0x16E4F8C8EEFA4FBDLL;
  s2[3] = 0x383014F4983B6382LL;
  s2[4] = 0xEA32360C3D843607LL;
  s2[5] = 42581LL;
  v8 = 0;
  puts("Can You Find the Secret?");
  puts("Give me your flag");
  *s = 0LL;
  v10 = 0LL;
  v11 = 0LL;
  v12 = 0LL;
  v13 = 0LL;
  v14 = 0LL;
  v15 = 0;
  __isoc99_scanf("%s", s);
  if ( strlen(s) != 42 )
    exit(0);
  for ( i = 0; i < strlen(s); ++i )
  {
    v3 = s[i];
    v4 = rand();
    s[i] = Table[(16 * ((v3 + v4 % 255) >> 4) + 15) & (v3 + v4 % 255)];
  }
  if ( !memcmp(s, s2, 0x2AuLL) )
    puts("You get the Right Flag!!");
  else
    puts("Maybe your flag is Wrong o.O?");
  return 0;
}
```

可以发现flag和rand()要进行加密，但是可以通过srand设置种子来预测rand()的值，从而达到一样的效果，在另一个函数里面发现了srand(0x5377654Eu)，相当于srand(1400333646)

看加密部分，通过一串的运算来索引Table的下标，再和s2做对比，那么相当于(16 * ((v3 + v4 % 255) >> 4) + 15) & (v3 + v4 % 255)是要遍历的值

在这串运算中>>4相当于2^4，也就是除于16，和原来乘的16相抵消，变成(v3 + v4 % 255) + 15 & (v3 + v4 % 255)，(v3 + v4 % 255)做保留，+ 15不影响&运算，最终化简结果为(v3 + v4 % 255)

可以开始编写脚本，需要注意的是，这个附件是在linux下编写的，那么rand()的值也会不一样，脚本需要回到linux环境下跑才可以解得flag

```c
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
int main(){
    unsigned char Table[256] = {
    0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76, 
    0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0, 
    0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15, 
    0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75, 
    0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84, 
    0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF, 
    0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8, 
    0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2, 
    0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73, 
    0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB, 
    0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79, 
    0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08, 
    0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A, 
    0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E, 
    0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF, 
    0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16
    };
    srand(1400333646);
    char s2[42] = {
    0xEE, 0xE6, 0xD7, 0xB2, 0x8A, 0xAB, 0x13, 0x35, 0x02, 0x7B, 0xC9, 0xB9, 0x9C, 0xBA, 0xED, 0x2E,
    0xBD, 0x4F, 0xFA, 0xEE, 0xC8, 0xF8, 0xE4, 0x16, 0x82, 0x63, 0x3B, 0x98, 0xF4, 0x14, 0x30, 0x38,
    0x07, 0x36, 0x84, 0x3D, 0x0C, 0x36, 0x32, 0xEA, 0x55, 0xA6
    };
    for ( int i = 0; i < 42; i++){
        for ( int j = 0; j < 256; j++){
            if ( Table[j] == s2[i]){
                printf("%c", (j - rand() % 255));
            }
        }
    }
}
```

解得flag{B8452786-DD8E-412C-E355-2B6F27DAB5F9}
