/*
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.syndesis.connector.telegram;

import io.syndesis.integration.component.proxy.ComponentProxyComponent;
import io.syndesis.integration.component.proxy.ComponentProxyCustomizer;
import org.apache.camel.Exchange;
import org.apache.camel.component.telegram.model.OutgoingTextMessage;

import java.util.Map;
import java.util.Optional;

public class TelegramSendMessageCustomizer implements ComponentProxyCustomizer {

    private Optional<String> configuredChatId;

    @Override
    public void customize(ComponentProxyComponent component, Map<String, Object> options) {
        this.configuredChatId = Optional.ofNullable(options.get("chatId")).map(String.class::cast);
        component.setBeforeProducer(this::beforeProducer);
    }

    private void beforeProducer(Exchange exchange) {
        OutgoingTextMessage message = exchange.getIn().getBody(OutgoingTextMessage.class);

        // Chat ID priority (in Syndesis) should be: chatId field in the message, chatId at action level, TelegramChatId header
        if (message != null && message.getChatId() == null && this.configuredChatId.isPresent()) {
            // Overriding Camel default priority giving action configuration higher priority than header
            message.setChatId(this.configuredChatId.get());
        }
    }
}
