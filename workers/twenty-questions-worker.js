/**
 * Cloudflare Worker for AI Twenty Questions Game
 *
 * 설정 방법:
 * 1. Cloudflare Dashboard > Workers & Pages > Create Worker
 * 2. 이 코드를 붙여넣기
 * 3. Settings > Variables > Add Variable
 *    - Name: GOOGLE_API_KEY
 *    - Value: [발급받은 Gemini API 키]
 *    - Encrypt 체크
 * 4. Save and Deploy
 */

export default {
    async fetch(request, env, ctx) {
        // CORS 헤더
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // OPTIONS 요청 처리 (CORS preflight)
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // POST 요청만 허용
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        try {
            // 요청 본문 파싱
            const body = await request.json();
            const { prompt } = body;

            if (!prompt) {
                return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            // Gemini API 호출
            const apiKey = env.GOOGLE_API_KEY;

            if (!apiKey) {
                return new Response(JSON.stringify({ error: 'API key not configured' }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            const geminiResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 200,
                        }
                    })
                }
            );

            if (!geminiResponse.ok) {
                const errorText = await geminiResponse.text();
                console.error('Gemini API Error:', errorText);
                return new Response(JSON.stringify({ error: 'AI API request failed' }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            const data = await geminiResponse.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

            if (!aiResponse) {
                return new Response(JSON.stringify({ error: 'No response from AI' }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify({ response: aiResponse }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });

        } catch (error) {
            console.error('Worker Error:', error);
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};
