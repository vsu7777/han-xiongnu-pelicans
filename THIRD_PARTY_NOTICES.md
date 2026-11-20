# THIRD_PARTY_NOTICES

本仓库中的动画代码为独立编写。
制作**方法**参考了下列两个 MIT 开源项目（经 GitHub 远程只读阅读，未 clone、未复制代码文件）：
共用一副骑行骨架（曲柄、踏板、车轮由同一个距离函数算出）、每镜一个场景文件、纯 renderAt(t)、无头浏览器逐帧截图、联系表自查、check 脚本。

两者的成片、画面、音乐、构图与笑点保留所有权利，本片均未使用。
按用户要求，在此完整附上两者的 MIT 许可声明：

---
## The Pelican Test — https://github.com/RoyceBella-commits/The-Pelican-Test

MIT License

Copyright (c) 2026 Royce Bella

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
## meme67-art-history — https://github.com/Tunai-0511/meme67-art-history

MIT License

Copyright (c) 2026 Tunai-0511

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
系统字体 Noto Serif CJK SC（SIL Open Font License 1.1，Debian fonts-noto-cjk）在渲染时调用，未打包进本工程。


---

## v2 新增：Make Me a Hanzi 笔画中线数据

`glyphs_lishu.js` 从 https://github.com/skishore/makemeahanzi 的 graphics.txt 派生，只抽取了 55 个字的 medians（笔顺中线），之后又经过程序隶书化变换。graphics.txt 本身派生自 Arphic PL KaitiM GB 和 Arphic PL UKai，按 Arphic Public License 分发。许可全文如下：

```
ARPHIC PUBLIC LICENSE

Copyright (C) 1999 Arphic Technology Co., Ltd.
11Fl. No.168, Yung Chi Rd., Taipei, 110 Taiwan
All rights reserved except as specified below.

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is forbidden.

Preamble

   The licenses for most software are designed to take away your freedom to share and change it. By contrast, the ARPHIC PUBLIC LICENSE specifically permits and encourages you to use this software, provided that you give the recipients all the rights that we gave you and make sure they can get the modifications of this software.

Legal Terms

0. Definitions:
   Throughout this License, "Font" means the TrueType fonts "AR PL Mingti2L Big5", "AR PL KaitiM Big5" (BIG-5 character set) and "AR PL SungtiL GB", "AR PL KaitiM GB" (GB character set) which are originally distributed by Arphic, and the derivatives of those fonts created through any modification including modifying glyph, reordering glyph, converting format, changing font name, or adding/deleting some characters in/from glyph table.

   "PL" means "Public License".

   "Copyright Holder" means whoever is named in the copyright or copyrights for the Font.

   "You" means the licensee, or person copying, redistributing or modifying the Font.

   "Freely Available" means that you have the freedom to copy or modify the Font as well as redistribute copies of the Font under the same conditions you received, not price. If you wish, you can charge for this service.

1. Copying & Distribution
   You may copy and distribute verbatim copies of this Font in any medium, without restriction, provided that you retain this license file (ARPHICPL.TXT) unaltered in all copies.

2. Modification
   You may otherwise modify your copy of this Font in any way, including modifying glyph, reordering glyph, converting format, changing font name, or adding/deleting some characters in/from glyph table, and copy and distribute such modifications under the terms of Section 1 above, provided that the following conditions are met:

   a) You must insert a prominent notice in each modified file stating how and when you changed that file.

   b) You must make such modifications Freely Available as a whole to all third parties under the terms of this License, such as by offering access to copy the modifications from a designated place, or distributing the modifications on a medium customarily used for software interchange.

   c) If the modified fonts normally reads commands interactively when run, you must cause it, when started running for such interactive use in the most ordinary way, to print or display an announcement including an appropriate copyright notice and a notice that there is no warranty (or else, saying that you provide a warranty) and that users may redistribute the Font under these conditions, and telling the user how to view a copy of this License.

   These requirements apply to the modified work as a whole. If identifiable sections of that work are not derived from the Font, and can be reasonably considered independent and separate works in themselves, then this License and its terms, do not apply to those sections when you distribute them as separate works. Therefore, mere aggregation of another work not based on the Font with the Font on a volume of a storage or distribution medium does not bring the other work under the scope of this License.

3. Condition Subsequent
   You may not copy, modify, sublicense, or distribute the Font except as expressly provided under this License. Any attempt otherwise to copy, modify, sublicense or distribute the Font will automatically retroactively void your rights under this License. However, parties who have received copies or rights from you under this License will keep their licenses valid so long as such parties remain in full compliance.

4. Acceptance
   You are not required to accept this License, since you have not signed it. However, nothing else grants you permission to copy, modify, sublicense or distribute the Font. These actions are prohibited by law if you do not accept this License. Therefore, by copying, modifying, sublicensing or distributing the Font, you indicate your acceptance of this License and all its terms and conditions.

5. Automatic Receipt
   Each time you redistribute the Font, the recipient automatically receives a license from the original licensor to copy, distribute or modify the Font subject to these terms and conditions. You may not impose any further restrictions on the recipients' exercise of the rights granted herein. You are not responsible for enforcing compliance by third parties to this License. 

6. Contradiction
   If, as a consequence of a court judgment or allegation of patent infringement or for any other reason (not limited to patent issues), conditions are imposed on you (whether by court order, agreement or otherwise) that contradict the conditions of this License, they do not excuse you from the conditions of this License. If you cannot distribute so as to satisfy simultaneously your obligations under this License and any other pertinent obligations, then as a consequence you may not distribute the Font at all. For example, if a patent license would not permit royalty-free redistribution of the Font by all those who receive copies directly or indirectly through you, then the only way you could satisfy both it and this License would be to refrain entirely from distribution of the Font.

   If any portion of this section is held invalid or unenforceable under any particular circumstance, the balance of the section is intended to apply and the section as a whole is intended to apply in other circumstances. 

7. NO WARRANTY
   BECAUSE THE FONT IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY FOR THE FONT, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS OR OTHER PARTIES PROVIDE THE FONT "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE FONT IS WITH YOU. SHOULD THE FONT PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

8. DAMAGES WAIVER
   UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING, IN NO EVENT WILL ANY COPYRIGHTT HOLDERS, OR OTHER PARTIES WHO MAY COPY, MODIFY OR REDISTRIBUTE THE FONT AS PERMITTED ABOVE, BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL OR EXEMPLARY DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE FONT (INCLUDING BUT NOT LIMITED TO PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA OR PROFITS; OR BUSINESS INTERRUPTION), EVEN IF SUCH HOLDERS OR OTHER PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

```
